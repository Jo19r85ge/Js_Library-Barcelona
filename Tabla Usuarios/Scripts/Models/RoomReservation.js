class RoomReservation
{
    constructor(room, user)
    {
        this.Room = room;
        this.Code = room === undefined ? "" : room.Code;
        this.Hour = "";
        this.User = user === undefined ? "" : user.Name;
    }
}