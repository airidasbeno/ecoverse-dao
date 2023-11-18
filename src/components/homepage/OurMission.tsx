import React from 'react';
import styles from 'styles/modules/OurMission.module.css';

const OurMission: React.FC = () => {
    return (
        <>
            <section className={`${styles["our-mission"]}`}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.row} ${styles["align-items-center"]}`}>
                        <div className={`${styles["col-img"]}`}>
                            <div className={`${styles.content}`}>
                                <img className={`${styles["img-fluid"]} ${styles["rounded-circle"]}`}
                                     src="https://startbootstrap.github.io/startbootstrap-one-page-wonder/assets/img/01.jpg"
                                     alt="..."/>
                            </div>
                        </div>
                        <div className={`${styles["col-text"]}`}>
                            <div className={`${styles.content}`}>
                                <h2>EcoVerse DAO Mission</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio
                                    veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis
                                    recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`${styles["our-mission"]}`}>
                <div className={`${styles.container}`}>
                    <div className={`${styles.row} ${styles["align-items-center"]}`}>
                        <div className={`${styles["col-text"]}`}>
                            <div className={`${styles.content}`}>
                                <h2>EcoVerse DAO Mission</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod aliquid, mollitia odio
                                    veniam sit iste esse assumenda amet aperiam exercitationem, ea animi blanditiis
                                    recusandae! Ratione voluptatum molestiae adipisci, beatae obcaecati.</p>
                            </div>
                        </div>
                        <div className={`${styles["col-img"]}`}>
                            <div className={`${styles.content}`}>
                                <img className={`${styles["img-fluid"]} ${styles["rounded-circle"]}`}
                                     src="https://startbootstrap.github.io/startbootstrap-one-page-wonder/assets/img/01.jpg"
                                     alt="..."/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OurMission;
