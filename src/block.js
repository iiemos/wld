
import defiABI from "@/abis/defiABI.json";
import { useGlobalState } from "@/store";
export const str = 'hello world'

export function f(a) {
	return a + 1
}
// 链接钱包
export function connections() {
		window.ethereum
		.request({ method: "eth_requestAccounts" })
		.then((res) => {
			console.log(res, "当前钱包地址");
			myAddress.value = res[0];
			joinNetwork();
		})
		.catch((err) => {
			console.log(err);
			if (err.code == 4001) {
				console.log("用户拒绝连接");
			}
		});
}
// 加入网络
export function joinNetwork () {
	
}
// 授权Token
export function approveToken(address) {
}
// //demo2.js
// import { str, f } from 'demo1'