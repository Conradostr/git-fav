export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root)
    this.tbody = this.root.querySelector('table tbody')

    this.load()

  }

  load() {
    this.entries = [
      {
        login: "maykbrito",
        name: "Mayk Brito",
        public_repos: "76",
        followers: "12000"
      },
      {
        login: "diego3g",
        name: "Diego Fernandes",
        public_repos: "89",
        followers: "12050"
      }
    ]
  }

  delete(user) {
    const filterEntries = this.entries.filter(entry => entry.login !== user.login)

    this.entries = filterEntries
    console.log(this.entries)
    this.update()
  }
}

export class FavoritesView extends Favorites{
  constructor(root) {
    super(root)

    this.update()
  }
   
  update() {
    this.removeAllTr()

    this.entries.forEach(user => {
      const row = this.creatRow()
      row.querySelector(".user img").src = `https://github.com/${user.login}.png`
      row.querySelector(".user a").href = `https://github.com/${user.login}`
      row.querySelector(".user p").textContent = user.name
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