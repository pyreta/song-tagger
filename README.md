# Song Tagger

A basic song title and tagging crud interface with drag-and-drop and export capabilities built with Ruby on Rails and React.

-----

Features:

### Drag and drop into export list
When at least one song is in export list, Export button appears allowing for export of csv file.
![image of progress-bar code](screenshots/dragNdrop.gif)

### Create and Delete songs and tags
Songs cannot be created without at least one tag.  If tag does not already exist in database, a new one will be created. If tag attached to deleted song is not associated with any other songs in the database, the tag will also be deleted.

![image of progress-bar code](screenshots/createAndDeleteSong.gif)

Songs with duplicate titles cannot be created.

![image of progress-bar code](screenshots/duplicateName.gif)

### Edit song title and/or tag name
Double clicking on song item opens up edit mode allowing for editing of song title and CRUD options for tags.
![image of progress-bar code](screenshots/editSong.gif)

### Search by song title and/or tag name
Currently a brute force implementation.  Plenty of room for optimization.
![image of progress-bar code](screenshots/search.gif)
