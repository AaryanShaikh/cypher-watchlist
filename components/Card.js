import { Typography, Tag, Space, Tooltip } from 'antd'
import React from 'react'
import { FaPlayCircle } from 'react-icons/fa'
import { BsFillPatchCheckFill } from 'react-icons/bs'

const { Text } = Typography

const CardItem = ({ range, show, imgSrc, title, eps, total, type, category, status }) => {
    return (
        <div className={show ? "" : "removeCard"} style={{ boxShadow: "0px 0px 8px 2px #5454543d", height: range ? "300px" : "355px", width: range ? "" : "205px", borderRadius: "10px", overflow: "hidden", padding: "5px", display: "flex", justifyContent: "space-between", flexDirection: "column", transition: ".5s ease-in-out" }}>
            <img
                src={imgSrc}
                alt='img'
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
                <Text strong type="secondary">{type}</Text>
            </div>
            <Tooltip title={title}>
                <Text ellipsis>{title}</Text>
            </Tooltip>
        </div>
    )
}

export default CardItem