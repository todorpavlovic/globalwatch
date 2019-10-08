const basicController = {};

basicController.get = (req, res) => {
    res.json({
        message: "Welcome to API"
    })
}

export default basicController;