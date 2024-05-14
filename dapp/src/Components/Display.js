import "./Display.css";
const Display = ({ contract }) => {
    const getdata = async () => {
        try {
            let url;
            const index = document.querySelector(".index").value;
            url = await contract.getFile(index);

            const instruction=document.querySelector(".link").style.display="block";
            const link = document.querySelector(".download");
            link.innerHTML = `<a href=${url} download>${url}</a>`;
        }
        catch (e) {
            alert("Please enter the valid index");
        }
    };
    return (
        <>
            <div className="getBlock">
                <p className="get">GET File</p>
                <input
                    type="number"
                    placeholder="Enter Index"
                    className="index"
                ></input>
                <button className="button" onClick={getdata}>
                    Get Data
                </button>
                <div>
                    <h2 className="link">Download link: </h2>
                    <div className="download"></div>
                </div>
            </div>
        </>
    );
};
export default Display;