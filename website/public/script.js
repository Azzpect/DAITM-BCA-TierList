let draggable;
let remaining = 19;
let rows = document.querySelectorAll(".nominees");
document.querySelectorAll(".draggable").forEach(element => {
    element.addEventListener("dragstart", (e) => {
        draggable = e.target;
    });      
    element.addEventListener("touchstart", e => {
        draggable = e.target;
    });
})
document.addEventListener("touchmove", e => {
    e.preventDefault();
});
document.addEventListener("touchend", e => {
    draggable.style.left = e.clientX + 'px';
    draggable.style.top = e.clientY  + 'px';
    rows.forEach((row, index) => {
        let id = row.getAttribute("id")
        if(e.target.closest(`#${id}`)) {
            row.appendChild(draggable);
        }
    })
    remaining -= 1;
    if(remaining == 0) {
        document.querySelector("#submit").addEventListener("click", (e) => {
            let name = prompt("Enter your full name:");
            let data = {Name: name, tier: {
                S:[],
                A:[],
                B:[],
                C:[],
                D:[],
                F:[]
            }}
            for(let key in data.tier) {
                let nominees = document.querySelectorAll(`#${key}-nominee>.draggable`);
                nominees.forEach((nominee, index) => {
                    data.tier[key].push(nominee.getAttribute("name"));
                })
            }
            fetch("/send-tier", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({data})
            }).then(res => {
                return res.json();
            }).then(data => {
                document.querySelector(".message-text").innerHTML = `${data.status.toUpperCase()}! ${data.msg}`;
                document.querySelector(".message").style.display = "flex";
            }).catch(err => {
                console.log(err);
            })
            
        })
    }
})
document.addEventListener("dragover", (e) => {
    e.preventDefault();
});
document.addEventListener("drop", (e) => {
    draggable.style.left = e.clientX + 'px';
    draggable.style.top = e.clientY  + 'px';
    rows.forEach((row, index) => {
        let id = row.getAttribute("id")
        if(e.target.closest(`#${id}`)) {
            row.appendChild(draggable);
        }
    })
    remaining -= 1;
    if(remaining == 0) {
        document.querySelector("#submit").addEventListener("click", (e) => {
            let name = prompt("Enter your full name:");
            let data = {Name: name, tier: {
                S:[],
                A:[],
                B:[],
                C:[],
                D:[],
                F:[]
            }}
            for(let key in data.tier) {
                let nominees = document.querySelectorAll(`#${key}-nominee>.draggable`);
                nominees.forEach((nominee, index) => {
                    data.tier[key].push(nominee.getAttribute("name"));
                })
            }
            fetch("/send-tier", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({data})
            }).then(res => {
                return res.json();
            }).then(data => {
                document.querySelector(".message-text").innerHTML = `${data.status.toUpperCase()}! ${data.msg}`;
                document.querySelector(".message").style.display = "flex";
            }).catch(err => {
                console.log(err);
            })
            
        })
    }
})

function hideMessage() {
    document.querySelector(".message").style.display = "none";
}