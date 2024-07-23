const BACKEND_APP_URL = "http://localhost:3000";

// body : {}
export async function addTodo(note)
{
    const res = await fetch(`${BACKEND_APP_URL}/api/todo`,
        {
            method: "POST",
            body: JSON.stringify({ notes: note }),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    if (res.ok) {
        const data = await res.json();
        return data;

    }
    return null;
}


export async function getAllTodos()
{

    const res = await fetch(`${BACKEND_APP_URL}/api/todo`);
    if (res.ok) {
        const data = await res.json();
        return data;

    }
    return null;
}


export async function deleteTodo(id)
{
    const res = await fetch(`${BACKEND_APP_URL}/api/todo/${id}`,
    {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }

        })
        if (res.ok) {
            // const data = await res.json();
            // return data;
            console.log("data deleted");
    
        }
        // return null;
}

export async function updateTodo(id, body)
{ 
    const res = await fetch(`${BACKEND_APP_URL}/api/todo/${id}`, {
        method: "PUT",
        body: JSON.stringify({ notes: body }),
        headers: {
            "Content-Type": "application/json"

        }

    })
    if (res.ok) {
        const data = await res.json();
        return data;
    }
    return null;
    
}