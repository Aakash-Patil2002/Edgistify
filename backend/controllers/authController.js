const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Cart=require("../models/cart");
exports.Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
 
    const userExist=await User.findOne({email});
    if(userExist){
      return res.status(400).json({ message: "User already registered"});
    }
    const hashPassword=await bcrypt.hash(password,10);

    const newUser = new User({ name, email, password:hashPassword});
    const user=await newUser.save();

    const cartCreated=new Cart({userId:user._id,products:[]});
    const isCreated=await cartCreated.save();

    if(!isCreated){
      res.status(400).json({message:"Error while creating Cart"})
    }

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    isValid=await bcrypt.compare(password, user.password);
    if(!isValid){
      return res.status(400).json({ message: "Invalid password"});
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ token ,user:user.name});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
