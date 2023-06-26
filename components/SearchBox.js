import React, { useEffect, useState } from 'react'

const SearchBox = ({ searchText, setsearchText, isActive, setisActive, dark, refs }) => {
    const [text, settext] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            setsearchText(text)
        }, 500);
        setisActive(text != "")

        return () => clearTimeout(timer);
    }, [text])

    return (<>
        <div ref={refs} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <div onClick={() => { isActive ? settext("") : "" }} style={{ height: "30px", width: "30px", border: `1px solid ${dark ? "white" : "black"}`, borderRight: dark ? "white" : "#0e0e0e", justifyContent: "center", alignItems: "center", display: "flex", position: "relative", borderTopLeftRadius: isActive ? "0px" : "10px", borderBottomLeftRadius: isActive ? "0px" : "10px", transition: ".5s ease-in", cursor: isActive ? "pointer" : "auto" }}>
                <div style={{ height: "10px", width: "10px", borderRadius: isActive ? "0%" : "50%", border: `solid ${dark ? "white" : "black"}`, position: "absolute", top: isActive ? "7px" : "4px", transition: ".5s ease-in", transform: `rotate(${isActive ? 40 : 0}deg)`, borderTop: isActive ? `${dark ? "white" : "black"}` : `solid ${dark ? "white" : "black"}`, borderRight: isActive ? `${dark ? "white" : "black"}` : `solid ${dark ? "white" : "black"}` }}></div>
                <div style={{ height: "7px", width: "10px", border: `solid ${dark ? "white" : "black"}`, position: "absolute", borderRight: `${dark ? "white" : "black"}`, borderBottom: `${dark ? "white" : "black"}`, borderTop: `${dark ? "white" : "black"}`, right: isActive ? "4px" : "-2px", transition: ".5s ease-in", transform: `rotate(${isActive ? 90 : 327}deg)`, bottom: isActive ? "8px" : "9px" }}></div>
            </div>
            <div><input placeholder='Seek and find...' value={text} onChange={(e) => settext(e.target.value)} className="searchBx textFont" style={{ height: "30px", width: "200px", border: `1px solid ${dark ? "white" : "black"}`, padding: 0, margin: 0, borderLeft: dark ? "white" : "#0e0e0e", borderTopRightRadius: isActive ? "0px" : "10px", borderBottomRightRadius: isActive ? "0px" : "10px", transition: ".5s ease-in", color: dark ? "aliceblue" : "black" }} /></div>
        </div>
    </>
    )
}

export default SearchBox