import { Typography, Tag, Space, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import { BsFillPatchCheckFill } from 'react-icons/bs'

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

const CardItem = ({ range, show, imgSrc, title, eps, total, type, category, status, dark, isSearch, searchText }) => {
    const [isImgLoading, setisImgLoading] = useState(true)
    const highlightedTitle = <HighlightedString text={title} search={searchText} />;
    const [showLoader, setshowLoader] = useState(true)

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

    return (
        <div className='itmCard' style={{ boxShadow: dark ? "0px 0px 0px 0px #343434" : "0px 0px 8px 2px #5454543d", height: show ? range ? "300px" : "355px" : "0px", width: show ? range ? "" : "205px" : "0px", borderRadius: "10px", overflow: "hidden", padding: "5px", display: "flex", justifyContent: "space-between", flexDirection: "column", transition: ".5s ease", opacity: "1", position: "relative", background: dark ? "#343434" : "white", minWidth: range ? "150px" : "" }}>
            <div style={{ height: "80%", width: "100%", position: "relative", overflow: "clip" }}>
                <div style={{ height: "100%", width: "100%", position: "absolute", opacity: isImgLoading ? "1" : "0", display: "flex", justifyContent: "center", alignItems: "center", transition: ".5s ease-in-out" }}>
                    {showLoader ? <div class="spinner"></div> : ""}
                </div>
                <img
                    src={imgSrc}
                    alt='Loading Badass Image...'
                    style={{ height: "100%", width: "100%", opacity: isImgLoading ? "0" : "1", borderTopLeftRadius: "10px", borderTopRightRadius: "10px", transition: ".5s ease-in-out" }}
                    onLoad={() => setisImgLoading(false)}
                />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: "2" }}>
                <Space size="" style={{ opacity: total == 1 ? "0" : "1", transition: ".5s ease-in-out" }}>
                    <Tag className='textFont' style={{ color: dark ? "#6abe39" : "#389e0d", background: dark ? "#162312" : "#f6ffed", borderColor: dark ? "#274916" : "#b7eb8f", transition: ".5s ease-in-out" }}>{eps}</Tag>
                    <Tag className='textFont' style={{ color: dark ? "#854eca" : "#531dab", background: dark ? "#1a1325" : "#f9f0ff", borderColor: dark ? "#301c4d" : "#d3adf7", transition: ".5s ease-in-out" }}>{total}</Tag>
                </Space>
                <Tooltip title={status == "in progress" ? "Currently Watching" : "Completed"}>
                    {status == "in progress" ? <FaPlayCircle style={{ color: "#389DEF" }} /> : <BsFillPatchCheckFill style={{ color: "#78F100" }} />}
                </Tooltip>
                <Text className='textFont' strong type="secondary" style={{ color: dark ? "rgb(213 213 213)" : "black", transition: ".5s ease" }}>{type}</Text>
            </div>
            <Tooltip title={title}>
                <Text className='textFont' ellipsis style={{ color: dark ? "rgb(213 213 213)" : "black", transition: ".5s ease", padding: "5px", zIndex: "2" }}>{isSearch ? highlightedTitle : title}</Text>
            </Tooltip>
        </div>
    )
}

export default CardItem