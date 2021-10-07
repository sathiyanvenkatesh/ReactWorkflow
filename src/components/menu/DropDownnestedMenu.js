import React, { Component } from 'react'
const menujson=[
  {
    "title": "Option 1",
    "submenu": null
  },
  {
    "title": "Option 2",
    "submenu": [
      {
        "title": "Option 2.1",
        "submenu": [
          {
            "title": "Option 2.1.1",
            "submenu": null
          },
          {
            "title": "Option 2.1.2",
            "submenu": null
          }
        ]
      },
      {
        "title": "Option 2.2",
        "submenu": [
          {
            "title": "Option 2.2.1",
            "submenu": null
          },
          {
            "title": "Option 2.2.2",
            "submenu": null
          }
        ]
      }
    ]
  }
]


 class DropDownnestedMenu extends Component {

    getMenuItemTitle = (menuItem, index, depthLevel) => {
        return menuItem.title;
      };
    
      getMenuItem = (menuItem, depthLevel, index) => {
        const title = this.getMenuItemTitle(menuItem, index, depthLevel)
    
        if (menuItem.submenu && menuItem.submenu.length > 0) {
          return (
            <li key={index}>
              {title}
              <DropDownnestedMenu config={menuItem.submenu} submenu={true} key={index} />
            </li>
          );
        } else {
          return <li key={index}>{title}</li>;
        }
      };

       // const {config} = menujson;
      // console.log(JSON.stringify(menujson));


    render() {
      
        const options=[];
        menujson.map((item, index) => {
            options.push(this.getMenuItem(item, 0, index));
            return '';
            });
          if (menujson.submenu && menujson.submenu === true){
        return (
             <ul>{options}</ul>
        )}
        else{
           return (
            <ul className="dropdown-menu">{options}</ul>
           ) 
        }
    }
    
    }

export default DropDownnestedMenu;

