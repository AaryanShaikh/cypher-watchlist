import { Typography, Tag, Space, Tooltip } from 'antd'
import React, { useState } from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import { BsFillPatchCheckFill } from 'react-icons/bs'

const { Text } = Typography

const CardItem = ({ range, show, imgSrc, title, eps, total, type, category, status, dark }) => {
    const [isImgLoading, setisImgLoading] = useState(true)

    return (
        <div style={{ boxShadow: "0px 0px 8px 2px #5454543d", height: show ? range ? "300px" : "355px" : "0px", width: show ? range ? "" : "205px" : "0px", borderRadius: "10px", overflow: "hidden", padding: "5px", display: "flex", justifyContent: "space-between", flexDirection: "column", transition: ".5s ease", opacity: "1", position: "relative", background: dark ? "#3A3A3A" : "white" }}>
            <img
                src={imgSrc}
                alt='Loading Badass Image...'
                style={{ height: "80%", width: "100%" }}
            />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Space size="">
                    <Tag color="green">{eps}</Tag>
                    <Tag color="purple">{total}</Tag>
                </Space>
                <Tooltip title={status == "in progress" ? "Currently Watching" : "Completed"}>
                    {status == "in progress" ? <FaPlayCircle style={{ color: "#389DEF" }} /> : <BsFillPatchCheckFill style={{ color: "#78F100" }} />}
                </Tooltip>
                <Text strong type="secondary" style={{ color: dark ? "white" : "black", transition: ".5s ease" }}>{type}</Text>
            </div>
            <Tooltip title={title}>
                <Text ellipsis style={{ color: dark ? "white" : "black", transition: ".5s ease", padding: "5px" }}>{title}</Text>
            </Tooltip>
        </div>
    )
}

export default CardItem