const getUser = (req, res) => {
    return res.status(200).json({
        data: {
            id: 1,
            name: 'ewmat'
        }
    });

};

export {
    getUser
}