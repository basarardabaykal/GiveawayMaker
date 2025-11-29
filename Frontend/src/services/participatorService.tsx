import { api } from "./api";

const CONTROLLER_NAME = "participator";

export const participatorService = {
	async joinGiveaway(data: {
		FullName: string;
		PhoneNumber: string;
		FingerPrintId: string;
		IpAddress: string;
		AuthProvider: string;
		ProviderUserId: string;
		GiveawayId: string;
	}): Promise<any> {
		try {
			const response = await api.post(`/${CONTROLLER_NAME}/join-giveaway`, data);
			if (!response.data.success) {
				console.log(response.data.message);
			}
			return response;
		} catch (error) {
			console.log("Bir hata ile karşılaşıldı.");
			return;
		}
	},
};
