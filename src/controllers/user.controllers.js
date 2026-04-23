import { User } from "../models/user.models.js";

const generateRefreshAndAccessToken = async function (userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};


export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if ([username, email, password].some((e) => !e || e.trim() === "")) {
        return res.status(400).json({ message: "Please fill all fields." });
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existedUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const newUser = await User.create({ username, email, password });

    const user = await User.findById(newUser._id).select("-password -refreshToken");

    return res.status(201).json({
        message: "User created successfully",
        data: user
    });
};



export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some((e) => !e || e.trim() === "")) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id);

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    };

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
            message: "User logged in!",
            data: loggedInUser
        });
};



export const logoutUser = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ message: "User logged out." });
};



// Refresh Tokens
export const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "Unauthorized request" });
    }

    try {
        const decoded = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decoded._id);

        if (!user || user.refreshToken !== incomingRefreshToken) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const { accessToken, refreshToken } =
            await generateRefreshAndAccessToken(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict"
        };

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "Access token refreshed"
            });

    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired refresh token" });
    }
};



// Get User
export const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");

    return res.status(200).json({
        message: "User fetched successfully",
        data: user
    });
};