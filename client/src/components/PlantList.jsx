

function PlantList({plantData}){
    return(
    <div className="grid lg:grid-cols-4 gap-4 ml-4 mr-4">
        {plantData.map(function(data) {
            return(
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <img className="max-w-auto" src={data.plant_image}></img>
                    {data.plant_name}
                </div>
            )
        })}
    </div>
    )
}

export default PlantList;