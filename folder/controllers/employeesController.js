const Employee=require('../model/Employee');


const getAllEmployees = async (req, res) => {
    const employees=await Employee.find();
    if(!employees) return res.status(204).json({'message':'NO employess found.'});
    res.json(employees);
}

const createNewEmployee =async  (req, res) => {
    if(!req?.body?.firstname||!req?.body?.lastname){
        return res.status(400).json({'message':'First and last name and equired'});
    }
    try{
        const result =await Employee.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname
        });
        res.status(201).json(result);
    }catch(err){
        console.log(err);
    }
}

const updateEmployee = async (req, res) => {
   if(!req?.body?.id){
    return res.status(400).json({'message':'ID parameter is required'});
   }

   const employee=await Employee.findOne({_id:req.body.id}).exec();

    if (!employee) {
        return res.status(400).json({ "message": `No employees matched ID ${req.body.id}` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result=await employee.save();
    res.json(result);
}

//Direct way
/* 
const updateEmployee = (req, res) => {
    // Find the employee by id
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

    // If the employee doesn't exist, return an error
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }

    // Update the employee fields if provided
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;

    // Directly return the updated employees list
    res.json(data.employees);
};

*/

const deleteEmployee = async (req, res) => {
    if(!req?.body?.id) return res.status(400).json({'message':'Employees ID required'});
    const employee = await Employee.findOne({_id:req.body.id}).exec();
    if (!employee) {
        return res.status(400).json({ "message": `No employees matched ID ${req.body.id}` });
    }
    const result = await employee.deleteOne({_id:req.body.id});
    res.json(result);
}

const getEmployee = async (req, res) => {
    if(!req?.params?.id) return res.status(400).json({'message':'Employees ID required'});
    const employee = await Employee.findOne({_id:req.params.id}).exec();
    if (!employee) {
        return res.status(400).json({ "message": `No employees matched ID ${req.body.id}` });
    }
    res.json(employee);
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}