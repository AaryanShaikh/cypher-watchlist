import React, { useState, useEffect, useRef, lazy } from 'react'
import { Input, Switch, Typography, FloatButton, Modal, Statistic, Tabs, List, Tour } from 'antd'
import { Gi3DGlasses, GiAbstract060, GiGamepad, GiTv } from 'react-icons/gi';
import { BiCameraMovie, BiMoviePlay, BiScatterChart } from 'react-icons/bi'
import { BsMoonStars, BsFillSunFill } from 'react-icons/bs';
import { MdScreenSearchDesktop } from 'react-icons/md'
import CardItem from '../../components/Card';
import Loader from '../../components/Loader';
import axios from 'axios';
import SearchBox from '../../components/SearchBox';
import Head from 'next/head';
import NumberCounter from '../../components/NumberCounter';
import Profile from '../../components/Profile';

const { Text } = Typography
const { Search } = Input
const { TabPane } = Tabs

const Homepage = () => {
    const [mainwidth, setwidth] = useState("")
    const widthRef = useRef(null)
    const range = mainwidth > 300 && mainwidth < 500
    const [categorySel, setcategorySel] = useState("all")
    const [isDark, setisDark] = useState(true)
    const [isLoading, setisLoading] = useState(true)
    const [showStats, setshowStats] = useState(false)
    const [searchText, setsearchText] = useState("")
    const [rawData, setrawData] = useState([])
    const [iniRender, setiniRender] = useState(true)
    const [viewScreenHeight, setviewScreenHeight] = useState(0)
    const [isActive, setisActive] = useState(false)
    const [allCats, setallCats] = useState(["all", "ongoing"])
    const [showTour, setshowTour] = useState(false)
    const [showProfile, setshowProfile] = useState(false)
    const step1 = useRef(null)
    const step2 = useRef(null)
    const step3 = useRef(null)
    const step4 = useRef(null)
    const step5 = useRef(null)
    const steps = [
        {
            title: 'Welcome to my Virtual Sanctuary!',
            description: "Within these digital walls, you'll find a collection of cherished memories, encompassing the vast universe of Anime, Series, Movies, and Games I've personally explored. Allow me to give you a quick tour of the site and then I'll leave you to wander freely.",
            cover: (
                <img
                    alt="tour.png"
                    src="https://github.com/AaryanShaikh/My-Stock/raw/main/welcome-images-server.gif"
                    style={{ width: "50%" }}
                />
            ),
            mask: {
                style: {
                    backdropFilter: 'grayscale(1)',
                    transition: ".5s ease-in-out"
                },
            },
            target: () => step1.current,
        },
        {
            title: 'data.filter()',
            description: "Use this section to execute a very complex code which will filter out the data for you.",
            target: () => step2.current,
            mask: {
                style: {
                    backdropFilter: 'grayscale(0.8)',
                    transition: ".5s ease-in-out"
                },
            },
        },
        {
            title: '!google',
            description: "Traverse this vast realm of information effortlessly using this search!",
            target: () => step4.current,
            mask: {
                style: {
                    backdropFilter: 'grayscale(0.6)',
                    transition: ".5s ease-in-out"
                },
            },
        },
        {
            title: "Now u see me, now u don't!",
            description: "Transform the atmosphere at your command, be it Light or Dark!",
            target: () => step5.current,
            mask: {
                style: {
                    backdropFilter: 'grayscale(0.4)',
                    transition: ".5s ease-in-out"
                },
            },
        },
        {
            title: 'typeof number',
            description: "This will allow you to unravel the Melody of Statistics",
            target: () => step3.current,
            mask: {
                style: {
                    backdropFilter: 'grayscale(0.2)',
                    transition: ".5s ease-in-out"
                },
            },
        },
        {
            title: 'Who is Aaryan?',
            description: "This will allow you to access my profile & my other handles!",
            target: () => step1.current,
            mask: {
                style: {
                    backdropFilter: 'grayscale(0)',
                    transition: ".5s ease-in-out"
                },
            },
        },
    ];

    useEffect(() => {
        setcategorySel(isActive ? "search" : "all")
    }, [isActive])

    useEffect(() => {
        setwidth(widthRef.current.offsetWidth)
    }, [widthRef])

    useEffect(() => {
        setisLoading(true)
        const handleResize = () => {
            const screenHeight = window.screen.height;
            const windowHeight = window.innerHeight;
            setviewScreenHeight(windowHeight)
        };

        // Attach the resize event listener
        window.addEventListener('resize', handleResize);

        // Call the handler once on component mount
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (iniRender) {
            setiniRender(false)
            fetchData()
        }
    }, [isLoading])

    const fetchData = async () => {
        try {
            const response = await axios.get('https://raw.githubusercontent.com/AaryanShaikh/cypher-watchlist/main/data/rawData.json');
            setrawData(response.data)
            const uniqueArray = Array.from(
                new Set(response.data.map((obj) => obj.category))
            );
            setallCats([...allCats, ...uniqueArray])
            setisLoading(false)
            setshowTour(true)
        } catch (error) {
            setisLoading(false)
            console.log('Error fetching JSON data:', error);
        }
    };

    const capitalizeFirstLetter = (str) => {
        if (typeof str !== 'string' || str.length === 0) {
            return str;
        }

        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (<>
        <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
            <title>Aaryan's Memoirs</title>
        </Head>
        {
            isLoading ? <Loader /> : ""
        }
        {
            isLoading ? <div style={{ position: "absolute", height: "100vh", width: "100%", zIndex: "999", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                <Text className='loadingText'><span>Loading...&nbsp;</span></Text>
            </div> : ""
        }
        {showProfile ? <Profile showProfile={showProfile} setshowProfile={setshowProfile} range={range} /> : ""}
        <Modal title="Overall Statistics" open={showStats} onCancel={() => setshowStats(false)} footer={[]}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,auto)", justifyContent: range ? "space-between" : "normal", }}>
                <NumberCounter title="Total [All] Watched" end={rawData.length - rawData.filter(x => x.category == "game").length} />
                <NumberCounter title="Total Games Completed" end={rawData.filter(x => x.category == "game").length} />
                <NumberCounter title="Total Anime Watched" end={rawData.filter(x => x.category == "anime").length} />
                <NumberCounter title="Total [Anime Eps] Watched" end={rawData.filter(x => x.category == "anime").reduce((acc, obj) => { return acc + obj.eps }, 0)} />
                <NumberCounter title="Total Series Watched" end={rawData.filter(x => x.category == "series").length} />
                <NumberCounter title="Total [Series Eps] Watched" end={rawData.filter(x => x.category == "series").reduce((acc, obj) => { return acc + obj.eps }, 0)} />
                <NumberCounter title="Total Movies Watched" end={rawData.filter(x => x.category == "movies").length} />
                <NumberCounter title="Total Currently Watching" end={rawData.filter(x => x.status == "in progress").length} />
            </div>
        </Modal>
        {isLoading ? "" : <FloatButton ref={step3} icon={<BiScatterChart />} onClick={() => setshowStats(true)} />}
        <div ref={widthRef} style={{ position: "absolute", width: "100%", height: "100vh", background: "transparent", backdropFilter: `blur(${isLoading ? "10" : "0"}px)`, zIndex: "100", transition: ".5s ease-in-out", pointerEvents: "none" }}></div>
        <div className='heading' style={{ background: !isDark ? "#0E0E0E" : "white" }}>
            {range ? <div onClick={() => { setshowProfile(true) }} ref={step1} style={{ display: "flex", flexDirection: "column", cursor: "pointer" }}><Text className='logo' style={{ color: !isDark ? "white" : "black", transition: ".5s ease" }}>Aaryan's</Text><Text className='logo' style={{ color: !isDark ? "white" : "black", transition: ".5s ease" }}>Memoirs</Text></div> :
                <Text onClick={() => { setshowProfile(true) }} ref={step1} style={{ color: !isDark ? "white" : "black", transition: ".5s ease", cursor: "pointer" }} className='logo'>Aaryan's Memoirs</Text>
            }
            <SearchBox refs={step4} dark={!isDark} searchText={searchText} setsearchText={setsearchText} isActive={isActive} setisActive={setisActive} />
            <Switch ref={step5} checked={isDark} onChange={(e) => setisDark(e)} checkedChildren={<BsFillSunFill />} unCheckedChildren={<BsMoonStars />} />
        </div>
        <div style={{ display: "flex", flexDirection: range ? "row" : "column", gap: "5px", background: !isDark ? "#0E0E0E" : "white", minHeight: "100vh" }}>
            <Tabs defaultActiveKey='all' activeKey={categorySel} tabPosition={range ? "top" : "left"} style={{ padding: "10px", overflow: range ? "scroll" : "hidden" }} onChange={(e) => setcategorySel(e)}>
                {
                    isActive ? <TabPane tab={
                        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexDirection: range ? "column" : "row" }}>
                            <MdScreenSearchDesktop style={{ color: "#1677ff", fontSize: "20px" }} />
                            <Text style={{ color: isDark ? "black" : "aliceblue" }}>Search</Text>
                        </div>
                    } key="search" style={{ color: range ? "aliceblue" : "black" }}>
                        <div className='scrollVisible' style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`, width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: range ? viewScreenHeight - 197 : "86vh", padding: "10px 5px", transition: ".5s ease-in-out" }}>
                            <List
                                grid={{ gutter: 16, column: range ? 2 : 6 }}
                                header={<Text style={{ color: isDark ? "black" : "aliceblue", transition: ".5s ease-in" }}>Found <span style={{ color: "#1677ff", fontWeight: "bolder" }}>{rawData.filter(obj => obj.title.toLowerCase().includes(searchText.toLowerCase())).length}</span> records</Text>}
                                dataSource={rawData.filter(obj => obj.title.toLowerCase().includes(searchText.toLowerCase()))}
                                pagination={{ pageSize: 12, showSizeChanger: false }}
                                renderItem={(ele, ind) => (
                                    <List.Item>
                                        <CardItem key={ind} dark={!isDark} range={range} show={true} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} isSearch={isActive} searchText={searchText} />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </TabPane> : <>
                        {
                            allCats.map((ele, ind) => {
                                return <TabPane key={ele} tab={
                                    <div ref={ind == 0 ? step2 : null} style={{ display: "flex", gap: "10px", alignItems: "center", flexDirection: range ? "column" : "row" }}>
                                        {
                                            ele == "all" ? <Gi3DGlasses className={categorySel == "all" ? 'menuIconAnimate' : ""} style={{ opacity: "1", fontSize: "20px", transition: ".5s ease-in-out", color: isDark ? "black" : "aliceblue" }} /> :
                                                ele == "ongoing" ? <GiTv className={categorySel == "ongoing" ? 'menuIconAnimate' : ""} style={{ color: isDark ? "black" : "aliceblue", opacity: "1", fontSize: "20px", transition: ".5s ease-in-out", }} /> :
                                                    ele == "anime" ? <GiAbstract060 className={categorySel == "anime" ? 'menuIconAnimate' : ""} style={{ color: isDark ? "black" : "aliceblue", opacity: "1", fontSize: "20px", transition: ".5s ease-in-out", }} /> :
                                                        ele == "series" ? <BiMoviePlay className={categorySel == "series" ? 'menuIconAnimate' : ""} style={{ color: isDark ? "black" : "aliceblue", opacity: "1", fontSize: "20px", transition: ".5s ease-in-out", }} /> :
                                                            ele == "movies" ? <BiCameraMovie className={categorySel == "movies" ? 'menuIconAnimate' : ""} style={{ color: isDark ? "black" : "aliceblue", opacity: "1", fontSize: "20px", transition: ".5s ease-in-out", }} /> :
                                                                ele == "game" ? <GiGamepad className={categorySel == "game" ? 'menuIconAnimate' : ""} style={{ color: isDark ? "black" : "aliceblue", opacity: "1", fontSize: "20px", transition: ".5s ease-in-out", }} /> : ""
                                        }
                                        <Text style={{ color: isDark ? categorySel == { ele } ? "#1677ff" : "black" : "aliceblue" }}>{capitalizeFirstLetter(ele)}</Text>
                                    </div>
                                }>
                                    <div className='scrollVisible' style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${range ? "150" : "200"}px, 1fr))`, width: "98%", gap: "20px", overflowY: "scroll", overflowX: "hidden", maxHeight: range ? viewScreenHeight - 197 : "86vh", padding: "10px 5px", transition: ".5s ease-in-out" }}>
                                        <List
                                            grid={{ gutter: 16, column: range ? 2 : 6 }}
                                            header={<Text style={{ color: isDark ? "black" : "aliceblue", transition: ".5s ease-in" }}>Total <span style={{ color: "#1677ff", fontWeight: "bolder" }}>{
                                                ele == "all" ? rawData.length :
                                                    ele == "ongoing" ? rawData.filter(x => x.status == "in progress").length :
                                                        rawData.filter(x => x.category == ele).length
                                            }</span> records</Text>}
                                            dataSource={
                                                ele == "all" ? rawData :
                                                    ele == "ongoing" ? rawData.filter(x => x.status == "in progress") :
                                                        rawData.filter(x => x.category == ele)
                                            }
                                            pagination={{ pageSize: 12 }}
                                            renderItem={(ele, ind) => (
                                                <List.Item>
                                                    <CardItem key={ind} dark={!isDark} range={range} show={true} imgSrc={ele.imgSrc} title={ele.title} eps={ele.eps} total={ele.total} type={ele.type} status={ele.status} />
                                                </List.Item>
                                            )}
                                        />
                                    </div>
                                </TabPane>
                            })
                        }
                    </>
                }
            </Tabs>
        </div>
        <Tour open={showTour} onClose={() => setshowTour(false)} steps={steps} />
    </>
    )
}

export default Homepage
