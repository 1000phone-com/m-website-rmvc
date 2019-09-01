export default class Position {
  constructor() {

  }
  getUser() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("hello tony!!11");
      }, 2000)
    })
  }

}
