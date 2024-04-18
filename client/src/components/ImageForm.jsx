import AWS from "aws-sdk";
import { supabase } from '../supabaseClient'

function ImageForm({imageFor, imageForId, closeButton}){
    const [file, setFile] = useState(null);
    const [randomNum, setRandomNum]= useState()

    useEffect(()=>{
        createFileName();
    }, [])

    const refreshPage = ()=>{
      window.location.reload();
   }

    const setPlantImage = async (link) => {
      console.log(link)
        const {  error} = await supabase
          .from('plants')
          .update({plant_image: link})
          .eq('id', data.id)
        if(error){
          console.log(error)
        } else{
          console.log("link added")
        }
    }
    const createFileName = () => {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 15; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setRandomNum(result)
    }

  // Function to upload file to s3
  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = "garden-notes-images";

    // S3 Region
    const REGION = "us-west-1";

    // S3 Credentials
    const accessKey = process.env.REACT_APP_ACCESS_KEY;
    const secretKey = process.env.REACT_APP_SECRET_ACCESS_KEY;
    AWS.config.update({
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: randomNum,
      Body: file,
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      let imageLink = "https://garden-notes-images.s3.us-west-1.amazonaws.com/" + randomNum;
      setPlantImage(imageLink)
      // Fille successfully uploaded
      alert("File uploaded successfully.");
      refreshPage()
    });
  };
  // Function to handle file and store it to file state
  const handleFileChange = (e) => {
    // Uploaded file
    const file = e.target.files[0];
    // Changing file state
    setFile(file);
  };
  return (
    <div className='upload'>
      <div className='close-button' onClick={() => editPlantClose(true)}>Close</div>
      <div className='plant-title'>
         <span><b>{data.plant_name}</b></span>
      </div>
      <p>Add or change plant image</p>
      <div className="upload-image">
        <input type="file" onChange={handleFileChange} />
        <button onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default ImageForm;