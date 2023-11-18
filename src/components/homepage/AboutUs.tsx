import React from 'react';
import styles from 'styles/modules/AboutUs.module.css';

type TeamMember = {
    image: string;
    title: string;
    profession: string;
};

const teamMembers: TeamMember[] = [
    {
        image: "https://via.placeholder.com/100",
        title: "Member 1",
        profession: "Profession 1"
    },
    {
        image: "https://via.placeholder.com/100",
        title: "Member 2",
        profession: "Profession 2"
    },
    {
        image: "https://via.placeholder.com/100",
        title: "Member 3",
        profession: "Profession 3"
    },
];

const AboutUs: React.FC = () => {
    return (
        <>
            <h1 className={styles.title}>Our Team</h1>
            <p className={styles.subtitle}>asdasdasdasdas da sd asd as das d asd asd asdasdasd asd asd asdsadasd</p>
            <div className={styles.aboutUs}>
                {teamMembers.map((member, index) => (
                    <div className={styles.column} key={index}>
                        <img className={styles.memberImage} src={member.image} alt={member.title}/>
                        <div className={styles.memberTitle}>{member.title}</div>
                        <div className={styles.memberProfession}>{member.profession}</div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AboutUs;
