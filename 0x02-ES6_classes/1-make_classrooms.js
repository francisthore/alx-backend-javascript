import ClassRoom from './0-classroom';

export default function initializeRooms() {
  const roomsArray = [];
  roomsArray.push(new ClassRoom(19));
  roomsArray.push(new ClassRoom(20));
  roomsArray.push(new ClassRoom(34));

  return roomsArray;
}
