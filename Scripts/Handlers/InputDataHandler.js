class InputDataHandler
{        
    constructor()
    {

    }

    GetAllModelPropertiesInNode(node)
    {
        let output = [];

        let subnodes = node.querySelectorAll('[property]');

        for (let i in subnodes)
        {
            let subnode = subnodes[i];
            if (subnode.getAttribute !== undefined)
            {
                let property = subnode.getAttribute("property");

                if ( subnode.tagName === "INPUT" && 
                    (subnode.type === "text" || 
                    subnode.type === "number" || 
                    subnode.type === "email" || 
                    subnode.type === "color" ||  
                    subnode.type === "time" ||  
                    subnode.type === "date"))
                { 
                    let propValue = subnode.value;
                    let obj = { Property: property, Value: propValue, Node: subnode };
                    output.push(obj);
                }
                else if ( subnode.tagName === "INPUT" && subnode.type === "checkbox")
                {
                    let propValue = subnode.checked;
                    let obj = { Property: property, Value: propValue, Node: subnode };
                    output.push(obj);
                }
            }
        }    
        
        return output;
    }

    FillModel(model, node)
    {
        if (this.InputValidation(node) === false )
        {
            return false
        }
        else
        {
            let propValues = this.GetAllModelPropertiesInNode(node);

            for (let i in propValues)
            {
                    let info = propValues[i];
                    model[info.Property] = info.Value;
            }
    
        }
    }

    FillForm(model, node)
    {
        let propValues = this.GetAllModelPropertiesInNode(node);

        for (let i in propValues)
        {
            let info = propValues[i];
            info.Node.value  = model[info.Property] ;
            info.Node.checked = model[info.Property] ;
        }
    }

    CleanForm(node)
    {
        let propValues = this.GetAllModelPropertiesInNode(node);

        for (let i in propValues)
        {
            let info = propValues[i];
            info.Node.value = "" ;
            info.Node.checked = false ;
        }
    }

    CleanForm2(type, node)
    {
        var emptyObject = new type();
        this.FillForm(emptyObject, node)
    }

    InputValidation(node)
    {
        let subnodes = node.querySelectorAll('[property]');
        var messages = [];

        for (let i in subnodes)
        {
            let subnode = subnodes[i];
            if (subnode.getAttribute !== undefined && subnode.tagName === "INPUT")
            {
                if (subnode.type === "text")
                {
                    if (subnode.value === "")
                    {
                        messages.push("Please fill missing fields!");
                        subnode.focus() ;
                    }
                } 
                if (subnode.type === "email")
                {
                    if (subnode.value === "")
                    {
                        messages.push("Please provide a valid email!" );
                        subnode.focus() ;
                    }
                } 
                if (subnode.type === "color")
                {
                    if (subnode.value === "#000000")
                    {
                        messages.push( "Please provide a valid color!" );
                        subnode.focus() ;
                    }
                } 
                if (subnode.type === "time")
                {
                    if (subnode.value === "")
                    {
                        messages.push( "Please provide a valid time!" );
                        subnode.focus() ;
                    }
                } 
                if (subnode.type === "number")
                {
                    if (subnode.value === "")
                    {
                        messages.push( "Please provide a number!" );
                        subnode.focus() ;
                    }
                } 
                if (subnode.type === "date")
                {
                    if (subnode.value === "")
                    {
                        messages.push( "Please provide a valid date!" );
                        subnode.focus() ;
                    }
                } 
            
            }
        }
        if (messages.length > 0) {
            alert(messages.join('\n'));
            return false;
        } 
        else
        {
            return true;
        } 
    }
}