import React, { useEffect } from 'react'

const SearchBox = ({ searchText, setsearchText, isActive, setisActive, dark, refs }) => {

    useEffect(() => {
        setisActive(searchText != "")
    }, [searchText])

    return (<>
        <div ref={refs} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <div style={{ height: "30px", width: "30px", border: `1px solid black`, borderRight: "transparent", justifyContent: "center", alignItems: "center", display: "flex", position: "relative", borderTopLeftRadius: isActive ? "0px" : "10px", borderBottomLeftRadius: isActive ? "0px" : "10px", transition: ".5s ease-in" }}>
                <div style={{ height: "10px", width: "10px", borderRadius: isActive ? "0%" : "50%", border: "solid black", position: "absolute", top: isActive ? "7px" : "4px", transition: ".5s ease-in", transform: `rotate(${isActive ? 40 : 0}deg)`, borderTop: isActive ? "transparent" : "solid", borderRight: isActive ? "transparent" : "solid" }}></div>
                <div style={{ height: "7px", width: "10px", border: "solid black", position: "absolute", borderRight: "transparent", borderBottom: "transparent", borderTop: "transparent", right: isActive ? "4px" : "-2px", transition: ".5s ease-in", transform: `rotate(${isActive ? 90 : 327}deg)`, bottom: isActive ? "8px" : "9px" }}></div>
            </div>
            <div><input placeholder='Seek and find...' value={searchText} onChange={(e) => setsearchText(e.target.value)} className="searchBx" style={{ height: "30px", width: "200px", border: "1px solid black", padding: 0, margin: 0, borderLeft: "transparent", borderTopRightRadius: isActive ? "0px" : "10px", borderBottomRightRadius: isActive ? "0px" : "10px", transition: ".5s ease-in", color: dark ? "aliceblue" : "black" }} /></div>
        </div>
    </>
    )
}

export default SearchBox