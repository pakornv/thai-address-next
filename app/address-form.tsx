"use client";

import type { Key } from "react";

import { FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  ComboBox,
  Description,
  FieldError,
  Fieldset,
  Form,
  IconChevronDown,
  Input,
  Label,
  ListBox,
  Spinner,
  Surface,
} from "@heroui/react";
import { useThaiAddress } from "@thai-address/react";

export function AddressForm() {
  const addr = useThaiAddress();

  const fields = [
    {
      label: "จังหวัด",
      name: "province",
      isDisabled: false,
      selectedKey: addr.selected.province?.value ?? null,
      onSelectionChange: (value: Key | null) =>
        addr.selectProvince(String(value)),
      items: addr.provinces,
    },
    {
      label: "อำเภอ/เขต",
      name: "district",
      isDisabled: !addr.selected.province,
      selectedKey: addr.selected.district?.value ?? null,
      onSelectionChange: (value: Key | null) =>
        addr.selectDistrict(String(value)),
      items: addr.districts,
    },
    {
      label: "ตำบล/แขวง",
      name: "subdistrict",
      isDisabled: !addr.selected.district,
      selectedKey: addr.selected.subdistrict?.value ?? null,
      onSelectionChange: (value: Key | null) =>
        addr.selectSubdistrict(String(value)),
      items: addr.subdistricts,
    },
    {
      label: "รหัสไปรษณีย์",
      name: "zipCode",
      isDisabled: !addr.selected.subdistrict,
      selectedKey: addr.selected.zipCode?.value ?? null,
      onSelectionChange: (value: Key | null) =>
        addr.selectZipCode(String(value)),
      items: addr.zipCodes,
    },
  ];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div className="bg-surface flex items-center justify-center rounded-3xl p-6">
      <Surface className="w-full min-w-95">
        <Form onSubmit={handleSubmit}>
          <Fieldset className="w-full">
            <Fieldset.Legend>ข้อมูลที่อยู่</Fieldset.Legend>
            <Description>กรุณากรอกข้อมูลที่อยู่ของคุณ</Description>
            <Fieldset.Group>
              {fields.map(({ label, items, ...props }) => (
                <ComboBox key={label} isRequired menuTrigger="focus" {...props}>
                  <Label>{label}</Label>
                  <ComboBox.InputGroup>
                    <Input placeholder="ค้นหา..." />
                    <ComboBox.Trigger>
                      {addr.isLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <IconChevronDown data-slot="combobox-trigger-default-icon" />
                      )}
                    </ComboBox.Trigger>
                  </ComboBox.InputGroup>
                  <ComboBox.Popover>
                    <ListBox items={items}>
                      {(item) => (
                        <ListBox.Item
                          key={item.value}
                          id={item.value}
                          textValue={item.value}
                        >
                          {item.value}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      )}
                    </ListBox>
                  </ComboBox.Popover>
                  <FieldError />
                </ComboBox>
              ))}
            </Fieldset.Group>
            <Fieldset.Actions>
              <Button type="submit">
                <FloppyDisk />
                บันทึก
              </Button>
              <Button type="reset" variant="secondary">
                ล้างค่า
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}
