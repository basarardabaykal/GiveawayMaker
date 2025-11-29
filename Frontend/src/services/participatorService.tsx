import { api } from "./api";

const CONTROLLER_NAME = "participator";

type DataResult<T = any> = {
	success: boolean;
	message?: string;
	data?: T | null;
	statusCode?: number;
};

function normalize<T = any>(response: any): DataResult<T> {
	const d = response?.data ?? {};
	const success = (d.Success ?? d.success ?? false) as boolean;
	const message = (d.Message ?? d.message ?? undefined) as string | undefined;
	const data = (d.Data ?? d.data ?? null) as T | null;
	const statusCode = (d.StatusCode ?? d.statusCode ?? response?.status ?? undefined) as number | undefined;
	return { success, message, data, statusCode };
}

export const participatorService = {
	async joinGiveaway(data: {
		FullName: string;
		PhoneNumber: string;
		FingerPrintId: string;
		IpAddress: string;
		AuthProvider: string;
		ProviderUserId: string;
		GiveawayId: string;
	}): Promise<DataResult> {
		try {
			const response = await api.post(`/${CONTROLLER_NAME}/join-giveaway`, data, { validateStatus: () => true });
			return normalize(response);
		} catch (err: any) {
			const statusCode = err?.response?.status;
			const message = err?.response?.data?.message ?? "Network or server error";
			return { success: false, message, data: null, statusCode };
		}
	},
};
