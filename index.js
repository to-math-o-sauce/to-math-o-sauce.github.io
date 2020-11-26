
function createProject(element){

    var link = document.createElement("a")
    link.href = element.url
    link.target = "_blank"

    var div = document.createElement("div")

    div.className = "project"

    var title = document.createElement("h3")

    title.innerText = element.title
    title.className = "project-title"

    var img = document.createElement("img")

    img.src = element.thumbnail
    img.alt = "Imagen"

    div.appendChild(title)
    div.appendChild(img)
    link.appendChild(div)

    return link
}

fetch('/stuff.json')
    .then(response => response.text())
    .then((data) => {

        var parsedData = JSON.parse(data)

        console.log()
        
        
        var p = document.getElementById("projects")

        for (let index = 0; index < parsedData.projects.length; index++) {
            var element = parsedData.projects[index];
            p.appendChild(createProject(element))
        }


    })