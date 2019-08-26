class RoomsViewModel
{
    constructor()
    {
        this.Rooms = [];
        
        this.InputHandler = new InputDataHandler();
        this.EditingRoom = null;       

        let buttons = 
        [
            new TableButtonInfo("Edit", (room) => { this.OnSelectedRoom(room); }),
            new TableButtonInfo("Remove", (room) => { this.OnDeletedRoom(room); })
        ];

        this.TableHandler = new TableHandler(
            RoomsTableContent,  //parentNode (dónde quiero que se genere la tabla)
            Room,               //modelType (el tipo para las columnas)
            buttons, //los botones que quiero para el BooksViewModel
            ["ReservedHours"]);  
                   
        this.CreateDefaultData();
    }

    CreateDefaultData()
    {
        var room1 = new Room();
        room1.Code = "R102";
        room1.Color = "#FF9F81";
        room1.Capacity = 3;
        room1.Accessible = true;

        var room2 = new Room();
        room2.Code = "R206";
        room2.Color = "#45C2FF";
        room2.Capacity = 4;
        room2.Accessible = false;
        
        var room3 = new Room();
        room3.Code = "R110";
        room3.Color = "#00CDC9";
        room3.Capacity = 2;
        room3.Accessible = true;

        this.AddRoom(room1);
        this.AddRoom(room2);
        this.AddRoom(room3);

    }

    AddNewRoom() // este viene del onclick del html
    {
        let room = new Room();
        
        if (this.InputHandler.FillModel(room, RoomsView) !== false)
        {
            this.AddRoom(room);
            this.CleanRoomForm();
        }
    }

    AddRoom(room)   //este puede venir de cualquier lado
    { 
        if (this.Rooms.length > 0)
        {
            for (let i in this.Rooms)
            {
                let existingRoom = this.Rooms[i];
                if( (existingRoom.Code) !== room.Code)
                {
                    this.Rooms.push(room);
                    this.TableHandler.AddRow(room); 
                    return;         
                }
                else
                {
                    alert ("Room exists already, please add a new room")
                    return;
                }
            }
        }
        else
        {
            this.Rooms.push(room);
            this.TableHandler.AddRow(room); 
        }  
    }

    UpdateRoom()
    {        
        this.InputHandler.FillModel(this.EditingRoom, RoomsView);
        this.TableHandler.UpdateRow(this.EditingRoom);

        this.CleanRoomForm();
    }

    CleanRoomForm()
    {
        this.InputHandler.CleanForm(RoomsView);
        this.TableHandler.Clean();
        
        BtAddRoom.classList.remove("BtInvisible");
        BtUpdateRoom.classList.add("BtInvisible");
    }

    OnSelectedRoom(room)
    {
        this.EditingRoom = room;

        this.InputHandler.FillForm(room, RoomsView);

        BtAddRoom.classList.add("BtInvisible");
        BtUpdateRoom.classList.remove("BtInvisible");
    }    

    OnDeletedRoom(room)
    {
        var response = confirm("Do you want to delete this room?");
        if (response == true) 
        {
            let i = this.Rooms.findIndex((x)=>x === room);
            this.Rooms.splice(i, 1);

            this.TableHandler.DeleteRow(room);
        } 
        else 
        {
            console.log("You pressed Cancel! cobarde pecador");
        }        
    }
}