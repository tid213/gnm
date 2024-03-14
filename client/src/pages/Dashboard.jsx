import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient'

function Dashboard ({session}) {

    const [userInfo, setUserInfo] = useState();
    const [plantData, setPlantData] = useState();
    const [plotData, setPlotData] = useState();
    const [noteData, setNoteData] = useState();
    const [formView, setFormView] = useState(false);

    return(
        <div>
            <h1>Signed In</h1>
            <div onClick={() => supabase.auth.signOut()}><p>Sign out</p></div>
        </div>
    )
}

export default React.memo(Dashboard);