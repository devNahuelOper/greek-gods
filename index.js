const express = require("express");

const app = require("./server/server");

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));

// mongodb+srv://dev:oJF8JxZC9wpHu6tn;@cluster0.ncp6z.mongodb.net/greek-gods?retryWrites=true&w=majority