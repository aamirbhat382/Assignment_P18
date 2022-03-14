// import {API} from '../../backend.js'
const API =
  "https://assignment-backend-p.herokuapp.com/api/";

export const signUpMethod = async (user) => {
  try {
		const response = await fetch(`${API}register`, {
			method: "POST",
			headers: {
				Accepts: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		return await response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const signInMethod = async (user) => {
  try {
		const response = await fetch(`${API}login`, {
			method: "POST",
			headers: {
				Accepts: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		return await response.json();
	} catch (err) {
		return console.log(err);
	}
};

export const uploadPdf = async (userId, token, pdf) => {
  try {
		const response = await fetch(`${API}user/upload/${userId}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: pdf,
		});
		return await response.json();
	} catch (err) {
		return console.log(err);
	}
};
export const getPdf =async (userId)=>{
	try {
		const response = await fetch(`${API}user/pdfs/${userId}`, {
			
		});
		return await response.json();
	} catch (err) {
		return console.log(err);
	}
}

export const viewPdf =async (pdfId)=>{
	try {
		const response = await fetch(`${API}user/pdf/view/${pdfId}`, {
			
		});
		return await response.json();
	} catch (err) {
		return console.log(err);
	}
}
export const dowmloadPdf =async (pdfId)=>{
	try {
		const response = await fetch(`${API}user/pdf/download/${pdfId}`, {
			
		});
		return await response.json();
	} catch (err) {
		return console.log(err);
	}
}
export const margePdf =async (userId)=>{
	try {
		const response = await fetch(`${API}user/pdfs/marge/${userId}`, {
			
		});
		return await response.json();
	} catch (err) {
		return console.log(err);
	}
}

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};
export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

