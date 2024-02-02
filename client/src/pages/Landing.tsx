import { useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Landing = () => {
    const [artworkIds, setArtworkIds] = useState<any[]>([]);
    const [randomArtwork, setRandomArtwork] = useState<any>();



    // when page loads default is Sunflower search
    useEffect(() => {
        const fetchArtworkIds = async () => {
            try {
                const response = await axios.get(
                    "https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&q=sunflower"
                );
                console.log(response.data);
                setArtworkIds(response.data.objectIDs);
                console.log("ids updated")
            } catch (error) {
            }
        };

        fetchArtworkIds();
    }, []);


    // function that retrives the data based on the IDs in the useState
    useEffect(() => {
        const fetchArtworkData = async () => {
            const randomIndex = Math.floor(Math.random() * artworkIds.length);
            try {
                let response = await axios.get(
                    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${artworkIds[randomIndex]}`
                );
                console.log("response is: " + response.data.primaryImage);
                if (response.data.primaryImage === "") {
                    response = await axios.get("https://collectionapi.metmuseum.org/public/collection/v1/objects/436524")
                }
                setRandomArtwork(response.data);
                console.log("data updated")
            }

            // This is a really dirty trick shhh
            catch (error) {
                try {
                    let response = await axios.get(
                        "https://collectionapi.metmuseum.org/public/collection/v1/objects/436524"
                    );

                    setRandomArtwork(response.data);
                    console.log("data updated")
                }
                catch (error) {
                }

            }
        };

        if (artworkIds.length > 0) {
            fetchArtworkData();
        }
    }, [artworkIds]); // whenever ID state is updated this function is called.


    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
            {/* Render the image of the random artwork as a background */}
            {randomArtwork && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: `url(${randomArtwork.primaryImage}) center/cover no-repeat`,
                    }}
                >
                    {/* Text and button over the image */}
                    <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                        <h1 style={{ color: "white", fontSize: "3em", textAlign: "center" }}>{randomArtwork.title}</h1>
                        <p style={{ color: "white", fontSize: "1.5em", textAlign: "center" }}>
                        {randomArtwork.artistDisplayName ? randomArtwork.artistDisplayName : randomArtwork.objectDate}
                        </p>
                        <button className="enterButton"><Link to="/main">Enter Site</Link></button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Landing;
