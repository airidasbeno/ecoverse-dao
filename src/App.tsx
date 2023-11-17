import {Buffer} from "buffer";
import {Layout, ConfigProvider, theme} from "antd";
import {TopMenu, MainContent} from "layout";
import "styles/App.css";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Marketplace from "./components/Marketplace/Marketplace";
import Profile from "./components/Profile/Profile";
import CreateCampaign from "./components/Campaigns/CreateCampaign";

const styles = {
    layout: {
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        fontFamily: "Sora, sans-serif"
    }
} as const;

function App() {
    const {defaultAlgorithm} = theme;
    if (!window.Buffer) window.Buffer = Buffer;
    return (
        <Router>
            <ConfigProvider
                theme={{
                    algorithm: defaultAlgorithm
                }}
            >
                <Layout style={styles.layout}>
                    <TopMenu/>
                    <MainContent>
                        <Routes>
                            <Route path="/" element={<Marketplace/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/create" element={<CreateCampaign/>}/>
                        </Routes>
                    </MainContent>
                </Layout>
            </ConfigProvider>
        </Router>
    );
}

export default App;
