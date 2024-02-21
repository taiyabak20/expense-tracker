const Expense = require('../models/Expense')

exports.dataByDate = async (req, res) => {
    let date = req.body.date;
    date = new Date(date); // Assuming date is in ISO format
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0); // Set time to the beginning of the day
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    const expenses = await Expense.find({
        userId: req.user._id,
        createdAt: { $gte: startDate, $lte: endDate } 
    })
        .select('id amount quantity category createdAt')
        .sort({ category: 1 });
    console.log(expenses)
    return res.json(expenses);
}


exports.dataByMonth = async (req, res) => {
    try {
        const month = req.body.month;
        const startDate = new Date(month);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
        console.log(startDate, endDate)
        const expenses = await Expense.find({
            userId: req.user._id,
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        })
            .select('id amount quantity category createdAt')
            .sort({ createdAt: 1, category: 1 });
    console.log(expenses)

        return res.json(expenses)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
}


exports.dataByYear = async (req, res) => {
    try {
        const year = req.body.year;
        const startYear = new Date(year)
        const endYear = new Date(startYear.getFullYear() + 1, 0, 1)
        console.log(startYear, endYear)
        const result = await Expense.find({
            userId: req.user._id,

                createdAt: {
                    $gte: startYear,
                    $lt: endYear,
                },
        })
        .select('id amount quantity category createdAt')
        .sort({category: 1})
              
        console.log(result)
        return res.json(result)
    } catch (e) {
        console.log(e)
        return res.status(500).json({ success: false, msg: "Internal server error" })
    }
}

