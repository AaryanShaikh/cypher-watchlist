import { Typography, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import errImage from '../data/NoImageFound.gif'
import { GiBookmark } from 'react-icons/gi'

const { Text } = Typography

function HighlightedString({ text, search }) {
    const regex = new RegExp(`(${search})`, 'gi');
    const parts = text.split(regex);

    return (
        <span>
            {parts.map((part, index) =>
                part.toLowerCase() === search.toLowerCase() ? (
                    <span className='markText' key={index}>{part}</span>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </span>
    );
}

const CardItem = ({ range, show, imgSrc, title, eps, total, type, status, dark }) => {
    const [isImgLoading, setisImgLoading] = useState(true)
    const [showLoader, setshowLoader] = useState(true)
    const [showErrorImg, setshowErrorImg] = useState(false)

    useEffect(() => {
        if (!isImgLoading) {
            const timeoutId = setTimeout(() => {
                setshowLoader(false);
            }, 500);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [isImgLoading])

    useEffect(() => {
        setshowLoader(true)
        setisImgLoading(true)
        setshowErrorImg(false)
    }, [imgSrc])

    return (
        <div className='cardItm' style={{ height: range ? "260px" : "38vh", border: "solid #999", borderRadius: "10px", position: 'relative', overflow: "clip", borderImage: `linear-gradient(to bottom,${dark ? "#212121" : "#fff"} 20%,#74737387) 1`, transitionDelay: ".5s", transition: ".5s ease-in-out", pointerEvents: show ? "all" : "none" }}>
            {showLoader ? <div className='imgLoad' style={{ position: "absolute", zIndex: "9", height: "100%", width: "100%", display: "flex", justifyContent: 'center', alignItems: 'center', backdropFilter: "blur(2px) grayscale(1) brightness(0.5)", transition: ".5s ease-in-out", opacity: isImgLoading ? "1" : "0" }}>
                <svg viewBox="25 25 50 50">
                    <circle r="20" cy="50" cx="50"></circle>
                </svg>
            </div> : ""}
            <img
                onLoad={() => setisImgLoading(false)}
                onError={() => setshowErrorImg(true)}
                src={showErrorImg ? errImage.src : imgSrc}
                style={{ height: "100%", width: "100%", WebkitMaskImage: "linear-gradient(to top, transparent 10%, black 50%)", position: "absolute", transition: ".5s ease-in-out", opacity: isImgLoading ? "0" : "1" }}
            />
            <div style={{ position: "absolute", display: "flex", flexDirection: "column", width: "100%", height: "100%", justifyContent: "flex-end" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 10px" }}>
                    <Text strong className='textFont' style={{ color: dark ? "rgb(213 213 213)" : "black", transition: ".5s ease", opacity: type == "Watchlist" ? "1" : total == 1 ? "0" : "1", fontSize: !range ? "1.8vh" : "" }}>{eps} / {total == 0 ? "?" : total}</Text>
                    <Tooltip title={type == "Watchlist" ? "Need 2 Watch" : status == "in progress" ? "Currently Watching" : "Completed"}>
                        {type == "Watchlist" ? <GiBookmark /> : status == "in progress" ? <FaPlayCircle style={{ color: "#389DEF" }} /> : <BsFillPatchCheckFill style={{ color: "#78F100" }} />}
                    </Tooltip>
                    <Text className='textFont' strong type="secondary" style={{ color: dark ? "rgb(213 213 213)" : "black", transition: ".5s ease", fontSize: !range ? "1.8vh" : "" }}>{type}</Text>
                </div>
                <Tooltip title={title}>
                    <Text className='textFont' ellipsis style={{ color: dark ? "rgb(213 213 213)" : "black", transition: ".5s ease", padding: "5px", zIndex: "2", alignSelf: "center", fontSize: !range ? "1.7vh" : "" }}>{title}</Text>
                </Tooltip>
            </div>
        </div>
    )
}

export default CardItem