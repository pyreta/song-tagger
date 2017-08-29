# Song Tagger

A basic song title and tagging crud interface with drag-and-drop and export capabilities built with Ruby on Rails and React.

-----


### Drag and drop into export list
When at least one song is in export list, Export button appears allowing for export of csv file.
![image](screenshots/dragNdrop.gif)

### Create and Delete songs and tags
Songs cannot be created without at least one tag.  If tag does not already exist in database, a new one will be created. If tag attached to deleted song is not associated with any other songs in the database, the tag will also be deleted.

Tags with less than 3 characters in the name will be invalid.  Songs with less than 3 characters in the title, or without at least one valid tag will not be created or updated.  

![image](screenshots/createAndDeleteSong.gif)

Songs and/or tags with duplicate names cannot be created.

![image](screenshots/duplicateName.gif)

Songs and/or tags with special characters names cannot be created.

![image](screenshots/specialCharacters.gif)

### Edit song title and/or tag name
Double clicking on song item opens up edit mode allowing for editing of song title and CRUD options for tags.  


![image](screenshots/editSong.gif)

### Search by song title and/or tag name
When search query is empty, all songs are automatically loaded.  Currently a brute force implementation.  Plenty of room for optimization.
![image](screenshots/search.gif)

### Responsive Design

![image](screenshots/responsive.gif)

### In the future
Refactoring of components folder structure, and implement `styled-components` instead of inline component styles mixed with stylesheets.
