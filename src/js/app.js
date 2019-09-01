
import Position from './controller/position'

const getUser = async () => {
  var name = await new Position().getUser();
  console.log(name);
}

getUser();