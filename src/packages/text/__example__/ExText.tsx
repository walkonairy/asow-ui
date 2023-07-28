import Text from "@/packages/text";

const ExText = () => {
  return (
    <div
      style={{ padding: 16, display: "flex", flexDirection: "column", gap: 20 }}
    >
      <Text tag="tb-1" as="p">
        111
      </Text>

      <Text tag="ta-6" as="a" target="_blank" href="https://www.baidu.com">
        Not A Member Yet？Register
      </Text>

      <Text tag="tb-4">333</Text>

      <Text tag="tc-6">555</Text>

      <Text tag="ha-2">666</Text>

      <Text tag={{ base: "ta-5", lg: "tc-6" }} as="h1">
        Hei
      </Text>

      <Text>Test 这个字体现实如何 How are you</Text>
    </div>
  );
};

export default ExText;
