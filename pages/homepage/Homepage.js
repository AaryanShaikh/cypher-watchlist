import React, { useState, useEffect, useRef } from 'react'
import { Input, Menu, Typography } from 'antd'
import { GiPopcorn, GiAbstract060, GiTv } from 'react-icons/gi';
import { BiCameraMovie, BiMoviePlay } from 'react-icons/bi'
import CardItem from '../../components/Card';
import rawData from "../../data/rawData.json"

const { Text } = Typography
const { Search } = Input

const Homepage = () => {
    const [mainwidth, setwidth] = useState("")
    const widthRef = useRef(null)
    const range = mainwidth > 300 && mainwidth < 500
    const [categorySel, setcategorySel] = useState("all")
    const webListStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: "85vh", padding: "10px 5px", transition: ".5s ease-in-out" }
    const mobListStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: "65vh", padding: "10px 5px" }

    useEffect(() => {
        setwidth(widthRef.current.offsetWidth)
    }, [widthRef])



    return (<>
        <div ref={widthRef} style={{ position: "absolute", width: "100%" }}></div>
        <div className='heading'>
            <Text className='logo'>{range ? "CW" : "Cypher's WatchList"}</Text>
            <Search style={{ width: range ? "55%" : "25%" }} placeholder={range ? "Search here" : "Try searching Anime, Series or Movie name"} />
        </div>
        <div style={{ display: "flex", flexDirection: range ? "column" : "row", gap: "5px" }}>
            <Menu
                style={{ width: range ? "100%" : "150px" }}
                mode={range ? "horizontal" : "inline"}
                inlineCollapsed={false}
                selectedKeys={categorySel}
            >
                <Menu.Item key="all" onClick={() => setcategorySel("all")} icon={<GiPopcorn style={{ fontSize: "20px" }} />}>{range ? "" : "All"}</Menu.Item>
                <Menu.Item key="ongoing" onClick={() => setcategorySel("ongoing")} icon={<GiTv style={{ fontSize: "20px" }} />}>{range ? "" : "Ongoing"}</Menu.Item>
                <Menu.Item key="anime" onClick={() => setcategorySel("anime")} icon={<GiAbstract060 style={{ fontSize: "20px" }} />}>{range ? "" : "Anime"}</Menu.Item>
                <Menu.Item key="series" onClick={() => setcategorySel("series")} icon={<BiMoviePlay style={{ fontSize: "20px" }} />}>{range ? "" : "Series"}</Menu.Item>
                <Menu.Item key="movies" onClick={() => setcategorySel("movies")} icon={<BiCameraMovie style={{ fontSize: "20px" }} />}>{range ? "" : "Movies"}</Menu.Item>
            </Menu>
            <div className='scrollVisible' style={range ? mobListStyle : webListStyle}>
                {
                    rawData.map((ele, ind) => {
                        return <CardItem key={ind} range={range} show={(ele.status=="in progress" && categorySel=="ongoing")|| categorySel == "all" || ele.category == categorySel} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} />
                    })
                }
            </div>
        </div>
    </>
    )
}

export default Homepage