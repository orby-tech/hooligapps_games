interface SubmitData {
    date: string;
    firstName: string;
    lastName: string;
}

export const submitPOST = (data: SubmitData) => {
    return fetch(`${"http://localhost:7070"}/submit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            date: data.date,
            first_name: data.firstName,
            last_name: data.lastName,
        }),
    });
};