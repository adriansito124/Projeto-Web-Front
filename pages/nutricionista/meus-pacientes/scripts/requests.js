const baseurl = "http://localhost:3000"

export async function getPacients() {

    const response = await fetch(
        `${baseurl}/nutri/pacients`,
        {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }
    )    

    return await response.json()
}