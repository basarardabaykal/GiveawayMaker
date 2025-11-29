import { api } from "./api";
//import { toast } from "react-hot-toast";

const CONTROLLER_NAME = "giveaway";

export const giveawayService = {
  
  async createGiveaway(content: string, numberOfWinners: number, numberOfSubstitutes: number): Promise<any> {
    try {
      const response = await api.post(`/${CONTROLLER_NAME}/create-giveaway`, {
        Content: content,
        NumberOfWinners: numberOfWinners,
        NumberOfSubstitutes: numberOfSubstitutes,
      });

      if (!response.data.success) {
        console.log(response.data.message)
      }

      return response
    } catch (error) {
      console.log("Bir hata ile karşılaşıldı.")
      return
    }
  },
  
  async endGiveaway(giveawayId: string): Promise<any> {
    try {
      const response = await api.patch(`/${CONTROLLER_NAME}/end-giveaway`, {
        GiveawayId: giveawayId,
      });
      if (!response.data.success) {
        console.log(response.data.message);
      }
      return response;
    } catch (error) {
      console.log("Bir hata ile karşılaşıldı.");
      return;
    }
  },
}