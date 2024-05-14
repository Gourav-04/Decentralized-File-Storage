import "./Total.css";
const Total = ({ contract}) => {
    const showTotal = async () => {
        try {
            let count;
            count = await contract.getFileCount();
            
            const link = document.querySelector(".totalFiles");
            link.innerHTML = count;
        }
        catch (e) {
            alert("Error in getting count. Please install metamask wallet and set account there");
            // alert("Error in getting count");
        }
    };
    return (
        <>
           <h2 className="file">Files Uploaded</h2>
           <button className="button" onClick={showTotal}>
                Show
            </button>
            <span className="totalFiles"></span>
        </>
    );
};
export default Total;