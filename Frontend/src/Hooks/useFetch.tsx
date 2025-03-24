export default function useFetch(baseUrl: string) {
    function get(url: string) {
        return fetch(baseUrl + url)
               .then(response => response.json());
    }

    function post(url: string, body: object) {
        return fetch(baseUrl + url , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)

        })
        .then (response => response.json())
    }

    return { get, post };
};

