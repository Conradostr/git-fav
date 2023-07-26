import { GitHubUser } from "./githubUsers.js"



export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.tbody = this.root.querySelector('table tbody')

    this.load()

  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
  }

  async add(username) {

    try {
      const userExist = this.entries.find(entry => entry.login === username)

      if(userExist) {
        throw new Error('Usuário já cadastrado')
      }

      const user = await GitHubUser.search(username)

      if(user.login === undefined) {
        throw new Error('Usuário não encontrado')
      }

      this.entries = [user, ...this.entries]
      this.update()
      this.save()
    } catch(error) {
      alert(error.message)
    }

  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
  }

  delete(user) {
    const filterEntries = this.entries.filter(entry => entry.login !== user.login)

    this.entries = filterEntries
    this.update()
    this.save()
  }
}

export class FavoritesView extends Favorites{
  constructor(root) {
    super(root)

    this.update()
    this.onadd()
  }
   
  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.creatRow()
      row.querySelector(".user img").src = `https://github.com/${user.login}.png`
      row.querySelector(".user a").href = `https://github.com/${user.login}`
      row.querySelector(".user p").textContent = user.name
      row.querySelector(".user span").textContent = `/${user.name}`
      row.querySelector(".repositories").textContent = user.public_repos
      row.querySelector(".followers").textContent = user.followers

      row.querySelector('.remove').onclick = () => {
        const isOk = confirm("Tem certeza que deseja remover esse usuário??")
        if(isOk) {
          this.delete(user)
        }
      }

      this.tbody.append(row)
    })
  }

  onadd() {
    const addButton = this.root.querySelector('.search button')
    addButton.onclick = () => {
      const { value } = this.root.querySelector('.search input')
      this.add(value)
    }
  }

  removeAllTr() {
    this.tbody.querySelectorAll('table tr').forEach((tr) => {
      tr.remove()
    })
  }

  creatRow() {
    const tr = document.createElement("tr")
    tr.innerHTML = `
    <td class="user">
            <img src="https://github.com/maykbrito.png" alt="Imagem de maykbrito">
            <a href="https://github.com/maykbrito">
              <p>Mayk Brito</p>
              <span>/maykbrito</span>
            </a>
          </td>
          <td class="repositories">
            123
          </td>
          <td class="followers">
            1234
          </td>
          <td>
            <button class="remove">Remover</button>
          </td>
          <td></td>
    `
    return tr
  }
}