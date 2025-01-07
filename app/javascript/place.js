import { typeToCategoryMap } from "./type_to_category_map";

document.addEventListener("turbo:load", function () {
  initializeMap();
});

function initializeMap() {
  const mapElement = document.getElementById("map");

  if (!mapElement) {
    return;
  }

  const map = new google.maps.Map(mapElement, {
    center: { lat: 35.6895, lng: 139.6917 }, // 東京
    zoom: 12,
  });

  const input = document.getElementById("mapSearchBox");
  const searchBox = new google.maps.places.SearchBox(input);
  const formElement = document.getElementById("place-form"); // フォーム要素
  let currentMarker = null; 

  // 初期状態でフォームを非表示
  formElement.style.display = "none";

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length === 0) {
      // 検索結果がない場合、フォームを非表示
      formElement.style.display = "none";
      alert("場所が見つかりませんでした。別の場所を検索してください。");
      return;
    }

    // 検索結果に基づいてフォームを表示
    const place = places[0];
    formElement.style.display = "block";

    document.getElementById("category").value = getReadableCategory(place.types);
      // カテゴリを取得する関数
      function getReadableCategory(types) {
        if (!types || types.length === 0) return "カテゴリ不明";

        // 最初に一致するカテゴリを見つける
        for (const type of types) {
          if (typeToCategoryMap[type]) {
            return typeToCategoryMap[type];
          }
        }

        // 一致するものがない場合のデフォルト値
        return "その他";
      }


    // フォームにデータを入力
    document.getElementById("name").value = place.name || "";
    document.getElementById("prefecture").value =
      place.address_components?.find((comp) =>
        comp.types.includes("administrative_area_level_1")
      )?.long_name || "";
      document.getElementById("address").value = (place.formatted_address || "").replace(/^日本、\s*/, "");
    document.getElementById("url").value = place.url || "";
    document.getElementById("website").value = place.website || "";
    document.getElementById("latitude").value = place.geometry.location.lat();
    document.getElementById("longitude").value = place.geometry.location.lng();
    document.getElementById("place_id").value = place.place_id || "";

    if (currentMarker) {
      currentMarker.setMap(null);
    }

    // 新しいマーカーを作成して地図に追加
    currentMarker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.name,
    });


    // 地図を移動
    map.setCenter(place.geometry.location);
    map.setZoom(15);
  });
}

