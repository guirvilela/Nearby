import { Button } from "@/components/button";
import { Loading } from "@/components/loading";
import { MarketCoupon } from "@/components/market/coupon";
import { MarketCover } from "@/components/market/cover";
import { MarketDetails } from "@/components/market/details";
import { useMarketController } from "@/hooks/market";
import { CameraView } from "expo-camera";
import { Redirect } from "expo-router";
import { Modal, ScrollView, StatusBar, View } from "react-native";

export default function Market() {
  const { form, qrLockLog, handleOpenCamera, handleUseCoupon } =
    useMarketController();

  if (form.value.loading || !form.value.marketData) {
    return <Loading />;
  }

  if (!form.value.marketData) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" hidden={form.value.modal} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <MarketCover uri={form.value.marketData.cover} />

        <MarketDetails data={form.value.marketData} />
        {form.value.coupon && <MarketCoupon code={form.value.coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>
      <Modal
        style={{ flex: 1 }}
        visible={form.value.modal}
        animationType="slide"
      >
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLockLog.current) {
              (qrLockLog.current = true),
                setTimeout(() => handleUseCoupon(data), 500);
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => form.set("modal")(false)}
            isLoading={form.value.couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
