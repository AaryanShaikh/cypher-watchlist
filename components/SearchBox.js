import React, { useEffect, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi';

const SearchBox = ({ searchText, setsearchText, isActive, setisActive, dark, refs }) => {
    const [text, settext] = useState("")
    const [labelText, setlabelText] = useState("Seek & Find...")
    const [isInputFocused, setIsInputFocused] = useState(false);

    const handleInputFocus = () => {
        setIsInputFocused(true);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setsearchText(text)
        }, 500);
        setisActive(text != "")

        return () => clearTimeout(timer);
    }, [text])

    return (<>
        <div ref={refs} style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <BiSearchAlt style={{ color: dark ? "#fff" : "#000", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)" }} />
            <div style={{ height: "30px", width: isInputFocused || text != "" ? "190px" : "100px", border: "solid #999", borderBottomRightRadius: "20px", borderTop: "transparent", borderLeft: "transparent", borderRight: "transparent", position: "relative", padding: "0px 5px", transition: ".5s cubic-bezier(0.68, -0.55, 0.265, 1.55)", borderImage: `linear-gradient(to right, ${dark ? "#999" : "#000"}, ${dark ? "#222222" : "#fff"}) 1` }}>
                <div style={{ position: "absolute", display: "flex", justifyContent: 'flex-start', width: "100%" }}>
                    <div className='searchLabel'>
                        {
                            labelText.split('').map((ele, ind) => {
                                return <span className={`textFont ${isInputFocused || text != "" ? "searchTxt" : ""}`} style={{ transitionDelay: `${ind * 40}ms`, color: dark ? "#fff" : "#000" }} key={ind}>{ele}</span>
                            })
                        }
                    </div>
                </div>
                <input
                    value={text}
                    onChange={(e) => settext(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    style={{ background: "none", outline: "none", border: "none", height: "100%", width: "90%", position: "absolute", color: dark ? "aliceblue" : "#000" }}
                />
            </div>
            {/* <div>
                <input placeholder='Seek and find...' value={text} onChange={(e) => settext(e.target.value)} className="searchBx textFont" style={{ height: "30px", width: "200px", border: `1px solid ${dark ? "white" : "black"}`, padding: 0, margin: 0, borderLeft: dark ? "white" : "#0e0e0e", borderTopRightRadius: isActive ? "0px" : "10px", borderBottomRightRadius: isActive ? "0px" : "10px", transition: ".5s ease-in", color: dark ? "aliceblue" : "black" }} />
            </div> */}
        </div>
    </>
    )
}

export default SearchBox