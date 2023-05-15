import React, { useState, useEffect, useRef } from 'react'
import { Input, Menu, Switch, Typography, FloatButton, Drawer, Radio, Space, Modal, Statistic } from 'antd'
import { GiPopcorn, GiAbstract060, GiTv } from 'react-icons/gi';
import { BiCameraMovie, BiMoviePlay, BiScatterChart } from 'react-icons/bi'
import { BsMoonStars, BsFillSunFill } from 'react-icons/bs';
import CardItem from '../../components/Card';
// import rawData from "../../data/rawData.json"
import Loader from '../../components/Loader';
import axios from 'axios';

const { Text } = Typography
const { Search } = Input

const Homepage = () => {
    const [mainwidth, setwidth] = useState("")
    const widthRef = useRef(null)
    const range = mainwidth > 300 && mainwidth < 500
    const [categorySel, setcategorySel] = useState("all")
    const webListStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: "89vh", padding: "10px 5px", transition: ".5s ease-in-out" }
    const mobListStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: "83vh", padding: "10px 5px" }
    const [isDark, setisDark] = useState(true)
    const [isLoading, setisLoading] = useState(true)
    const [showStats, setshowStats] = useState(false)
    const [searchText, setsearchText] = useState("")
    const [rawData, setrawData] = useState([])
    const [loadingData, setloadingData] = useState("Arranging DOM elements...")
    const [iniRender, setiniRender] = useState(true)

    useEffect(() => {
        setwidth(widthRef.current.offsetWidth)
    }, [widthRef])

    useEffect(() => {
        setisLoading(true)
    }, []);

    useEffect(() => {
        if (iniRender) {
            setiniRender(false)
            fetchData()
        }
    }, [isLoading])

    const fetchData = async () => {
        try {
            setloadingData("Fetching Cypher's Watchlist...")
            const response = await axios.get('https://raw.githubusercontent.com/AaryanShaikh/cypher-watchlist/main/data/rawData.json');
            setrawData(response.data)
            setisLoading(false)
        } catch (error) {
            setisLoading(false)
            console.log('Error fetching JSON data:', error);
        }
    };


    return (<>
        {
            isLoading ? <Loader /> : ""
        }
        {
            isLoading ? <div style={{ position: "absolute", height: "100vh", width: "100%", zIndex: "999", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                <Text strong>{loadingData}</Text>
            </div> : ""
        }
        <Modal title="Watch Statistics" open={showStats} onCancel={() => setshowStats(false)} footer={[]}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,auto)", justifyContent: range ? "space-between" : "normal" }}>
                <Statistic title="Total [All] Watched" value={rawData.length} />
                <Statistic title="Total [All Eps] Watched" value={rawData.filter(x => x.category != "movies").reduce((acc, obj) => { return acc + obj.eps }, 0)} />
                <Statistic title="Total Anime Watched" value={rawData.filter(x => x.category == "anime").length} />
                <Statistic title="Total [Anime Eps] Watched" value={rawData.filter(x => x.category == "anime").reduce((acc, obj) => { return acc + obj.eps }, 0)} />
                <Statistic title="Total Series Watched" value={rawData.filter(x => x.category == "series").length} />
                <Statistic title="Total [Series Eps] Watched" value={rawData.filter(x => x.category == "series").reduce((acc, obj) => { return acc + obj.eps }, 0)} />
                <Statistic title="Total Movies Watched" value={rawData.filter(x => x.category == "movies").length} />
                <Statistic title="Total Currently Watching" value={rawData.filter(x => x.status == "in progress").length} />
            </div>
        </Modal>
        {isLoading ? "" : <FloatButton icon={<BiScatterChart />} onClick={() => setshowStats(true)} />}
        <div ref={widthRef} style={{ position: "absolute", width: "100%", height: "100vh", background: "transparent", backdropFilter: `blur(${isLoading ? "10" : "0"}px)`, zIndex: "100", transition: ".5s ease-in-out", pointerEvents: "none" }}></div>
        <div className='heading' style={{ background: !isDark ? "#1b1b1b" : "white" }}>
            <Text style={{ color: !isDark ? "white" : "black", transition: ".5s ease" }} className='logo'>{range ? "CW" : "Cypher's WatchList"}</Text>
            <Search className={!isDark ? "dark" : ""} style={{ width: range ? "55%" : "25%" }} placeholder={range ? "Search here" : "Try searching Anime, Series or Movie name"} value={searchText} onChange={(e) => setsearchText(e.target.value)} />
            <Switch checked={isDark} onChange={(e) => setisDark(e)} checkedChildren={<BsFillSunFill />} unCheckedChildren={<BsMoonStars />} />
        </div>
        <div style={{ display: "flex", flexDirection: range ? "column" : "row", gap: "5px", background: !isDark ? "#1b1b1b" : "white" }}>
            <Menu
                style={{ width: range ? "100%" : "150px", background: !isDark ? "#1b1b1b" : "white", color: !isDark ? "white" : "black" }}
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
                    searchText != "" ?
                        rawData.filter(obj => obj.title.toLowerCase().includes(searchText.toLowerCase())).map((ele, ind) => {
                            return <CardItem key={ind} dark={!isDark} range={range} show={(ele.status == "in progress" && categorySel == "ongoing") || categorySel == "all" || ele.category == categorySel} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} />
                        }) :
                        rawData.map((ele, ind) => {
                            return <CardItem key={ind} dark={!isDark} range={range} show={(ele.status == "in progress" && categorySel == "ongoing") || categorySel == "all" || ele.category == categorySel} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} />
                        })
                }
            </div>
        </div>
    </>
    )
}

export default Homepage