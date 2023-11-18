import React from 'react';
import styles from 'styles/modules/OurMission.module.css';
import ourTeamImage from "assets/images/our-team.jpg";

const OurMission: React.FC = () => {
    return (
        <>
            <section className={`${styles["our-mission"]}`}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.row} ${styles["align-items-center"]}`}>
                        <div className={`${styles["col-img"]}`}>
                            <div className={`${styles.content}`}>
                                <img className={`${styles["img-fluid"]} ${styles["rounded-circle"]}`}
                                    src={ourTeamImage}
                                    alt="Our Team" />
                            </div>
                        </div>
                        <div className={`${styles["col-text"]}`}>
                            <div className={`${styles.content}`}>
                                <h3>EcoVerse DAO Mission</h3>
                                <p>Our decentralized autonomous organization (DAO) thrives on active participation, and
                                    your voice matters. Be a part of nature conservation campaigns! By leveraging WalletConnect, a secure bridge between your wallet
                                    and decentralized applications, you can seamlessly engage with the DAO's voting
                                    mechanisms and influence the direction of conservation projects.</p>
                                <p>Elevate your involvement in our community-driven conservation initiatives by embracing this
                                    cutting-edge technology. No longer will you need to worry about missing out on key
                                    voting opportunities; instead, focus on actively shaping the future of our EcoVerse
                                    DAO.</p>
                                <h3>EcoVerse DAO Team</h3>
                                <p>The EcoVerse DAO Team is a dedicated and diverse group of individuals united by a
                                    shared vision: to create and sustain a decentralized autonomous organization that
                                    fosters innovation, sustainability, conservation and community engagement. Comprising experts
                                    from various fields, our team brings a wealth of experience and passion to the
                                    forefront of the EcoVerse ecosystem.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OurMission;
