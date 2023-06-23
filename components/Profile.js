import { Button, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { SiGmail } from 'react-icons/si'
import { AiFillInstagram } from 'react-icons/ai'
import { VscGithub } from 'react-icons/vsc'
import { FaLinkedinIn } from 'react-icons/fa'
import { GiCrossedBones } from 'react-icons/gi'
import TypeIt from "typeit-react";

const Profile = ({ setshowProfile, showProfile, range }) => {
    const [isHovered, setisHovered] = useState(false)
    const [isImgLoading, setisImgLoading] = useState(true)
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setisHovered(true);
        }, 2000);

        // Clean up the timer when the component unmounts or when the effect is re-executed
        return () => clearTimeout(timer);
    }, [])

    return (
        <div style={{ position: "absolute", zIndex: "10", height: showProfile ? "99%" : "0%", width: "99%", display: "flex", justifyContent: "center", alignItems: "center", overflow: "clip", transition: ".5s ease-in-out" }}>
            {
                showProfile ?
                    <div style={{ minHeight: "70vh", width: range ? "70vw" : "30vw", maxWidth: "70vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", transition: ".5s ease-in -out", position: "relative", overflow: "clip", borderRadius: "10px", backdropFilter: "blur(2px) grayscale(1) brightness(0.5)" }}>
                        <Button onClick={() => { setshowProfile(false) }} type='text' icon={<GiCrossedBones />} style={{ position: "absolute", height: "20px", zIndex: "11", right: "10px", top: "10px" }}></Button>
                        <div style={{ width: "110%", background: "#ECE9E6", height: isHovered ? "130px" : "0px", position: "absolute", top: 0, borderBottomLeftRadius: "50%", borderBottomRightRadius: "50%", transition: ".5s ease-in-out" }}></div>
                        <div style={{ position: "relative" }}>
                            <div style={{ height: "100%", width: "100%", position: "absolute", opacity: isImgLoading ? "1" : "0", display: "flex", justifyContent: "center", alignItems: "center", transition: ".5s ease-in-out" }}>
                                {showLoader ? <div class="dot-spinner">
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                </div> : ""}

                            </div>
                            <img onLoad={() => setisImgLoading(false)} src="https://github.com/AaryanShaikh/My-Stock/raw/main/dpcircle.png" style={{ height: isHovered ? "150px" : "200px", width: isHovered ? "150px" : "200px", transition: ".5s ease-in-out", zIndex: 1, marginTop: "50px", border: `${isHovered ? "10px" : "0px"} solid #ECE9E6`, borderRadius: "50%" }} />
                        </div>
                        <TypeIt
                            style={{ color: "#ECE9E6", padding: "20px", fontSize: "17px" }}
                            getBeforeInit={(instance) => {
                                instance.type("Helllooo!!!").pause(500).delete(10).pause(500).type("i, its.me.cypher").pause(500).move(-9).pause(500).delete(4).pause(500).type("I am").pause(500).move(-1).pause(500).delete(2).pause(500).type("'").pause(500).move(3).pause(500).delete(2).pause(500).type(" ").pause(500).move(6).pause(500).delete(6).pause(500).type("Aa").pause(500).move(1).pause(500).type("yan").pause(500).type("shaikh").pause(500).move(-6).pause(500).type(" ").pause(500).move(1).delete(1).pause(500).type("S").pause(500).move(5).pause(500).delete(1).pause(500).type(".").break().pause(500).type("I do photo editing").pause(500).move(-8).pause(500).delete(5).pause(500).type("video").pause(500).delete(5).pause(500).type("audio").pause(500).delete(5).pause(500).move(-4).pause(500).type("'ve").pause(500).move(3).pause(500).type("ne").pause(500).move(9).pause(500).delete(9).pause(500).type(" some games using Unity and PlayMaker").pause(500).delete(45).pause(500).type(" am kinda like Jack of All Trades, although my main core is coding").pause(500).delete(6).pause(500).type("Web Development.").pause(500).break().pause(500).type("I use HTML").pause(500).delete(4).pause(500).type("CSS").pause(500).delete(3).pause(500).type("JavaScript").pause(500).delete(5).pause(500).move(-1).pause(500).delete(3).pause(500).move(-1).pause(500).type("React").pause(500).delete(5).pause(500).type("Next").pause(500).type(".").pause(500).move(2).pause(500).type(" to build dynamic Single Page Applications").pause(500).move(-1).pause(500).delete(10).pause(500).move(-1).pause(500).delete(4).pause(500).move(-1).pause(500).delete(6).pause(500).move(3).pause(500).type(". I guess that's the gist of it!").pause(500)


                                return instance;
                            }}
                        />
                        <div style={{ height: isHovered ? "50px" : "0px", background: "#ECE9E6", display: "flex", justifyContent: "space-around", width: "100%", alignItems: 'center', transition: ".5s ease-in-out" }}>
                            <SiGmail onClick={() => { window.location.href = 'mailto:aayanshaikh27638@gmail.com?subject=Hey Aaryan!' }} style={{ fontSize: "20px", cursor: "pointer" }} />
                            <AiFillInstagram onClick={() => { window.location.href = "https://www.instagram.com/its.me.cypher/" }} style={{ fontSize: "20px", cursor: "pointer" }} />
                            <VscGithub onClick={() => { window.location.href = "https://github.com/AaryanShaikh" }} style={{ fontSize: "20px", cursor: "pointer" }} />
                            <FaLinkedinIn onClick={() => { window.location.href = "https://www.linkedin.com/in/aaryan-shaik-019034181/" }} style={{ fontSize: "20px", cursor: "pointer" }} />
                        </div>
                    </div> : ""
            }
        </div >
    )
}

export default Profile