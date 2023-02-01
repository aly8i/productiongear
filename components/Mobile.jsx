import React from 'react'
import Image from 'next/image'
import apic from '../public/images/appstore.png'
import gpic from '../public/images/googleplay.png'
import styles from '../styles/Mobile.module.css'

const Mobile = ({googlestore,applestore,appname}) => {
  return (
    <div>
        <div id="wrapper">
            <div id="iconscontainer">
                <div id="apic">
                    <a href={process.env.NEXT_PUBLIC_GOOGLE_STORE} target="_blank" rel="noopener noreferrer" >
                        <Image className={styles.icon} src={apic} alt="" width={255} height={255}/>
                    </a >
                </div>   
                <div id="gpic">
                <a href={process.env.NEXT_PUBLIC_APPLE_STORE} target="_blank" rel="noopener noreferrer" >
                    <Image className={styles.icon} src={gpic} alt="" width={255} height={255}/>
                </a>
                </div> 
            </div>
        <div id="iphone">
            <div id="shadow"></div>
            <div id="side"></div>
            <div id="lines">
            <div>
                <div>
                <div></div>
                </div>
            </div>
            <div>
                <div>
                <div></div>
                </div>
            </div>
            </div>
            <div id="toggler">
            <div></div>
            </div>
            <div id="aux"></div>
            <div id="lightning"></div>
            <div id="bottom-speaker">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            </div>
            <div id="skrews">
            <div></div>
            <div></div>
            </div>
            <div id="volume">
            <div></div>
            <div></div>
            </div>
            <div id="front">
            <div id="front-cover"></div>
            <div id="camera">
                <div></div>
            </div>
            <div id="speaker"></div>
            <div id="screen">
                <div id="reminder">
                <div></div>
                <div>See you on the other side &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@{process.env.NEXT_PUBLIC_APP_NAME||"Light Studios"} </div>
                <div>now</div>
                </div>
                <div id="circle"></div>
                <div id="time">12:42</div>
                <div id="date">Saturday, January 4</div>
                <div id="bottom"></div>
                <div id="top"></div>
                <div id="slide">
                <div></div>
                slide to unlock
                </div>
                <div id="signal">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                </div>
                <div id="battery">
                <div>86%</div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                </div>
            </div>
            <div id="home">
                <div></div>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Mobile